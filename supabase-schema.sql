-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── TABLES ───────────────────────────────────────────────────────────────────

create table public.profiles (
  id        uuid references auth.users(id) on delete cascade primary key,
  role      text not null check (role in ('admin', 'winery', 'traveler')) default 'traveler',
  email     text not null,
  name      text,
  created_at timestamptz default now()
);

create table public.wineries (
  id          uuid default uuid_generate_v4() primary key,
  owner_id    uuid references public.profiles(id) on delete cascade not null,
  name        text not null,
  region      text not null,
  description text,
  status      text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at  timestamptz default now()
);

create table public.experiences (
  id         uuid default uuid_generate_v4() primary key,
  winery_id  uuid references public.wineries(id) on delete cascade not null,
  title      text not null,
  type       text not null,
  duration   integer not null,
  price      numeric(10,2) not null,
  status     text not null check (status in ('active', 'inactive')) default 'active',
  created_at timestamptz default now()
);

create table public.bookings (
  id            uuid default uuid_generate_v4() primary key,
  experience_id uuid references public.experiences(id) on delete cascade not null,
  traveler_id   uuid references public.profiles(id) on delete cascade not null,
  date          date not null,
  guests        integer not null default 1,
  status        text not null check (status in ('pending', 'confirmed', 'cancelled')) default 'pending',
  created_at    timestamptz default now()
);

create table public.inquiries (
  id             uuid default uuid_generate_v4() primary key,
  winery_id      uuid references public.wineries(id) on delete set null,
  traveler_email text not null,
  message        text not null,
  status         text not null check (status in ('new', 'read')) default 'new',
  created_at     timestamptz default now()
);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

alter table public.profiles   enable row level security;
alter table public.wineries   enable row level security;
alter table public.experiences enable row level security;
alter table public.bookings   enable row level security;
alter table public.inquiries  enable row level security;

-- Helper: avoid recursive RLS by using security definer
create or replace function public.get_my_role()
returns text as $$
  select role from public.profiles where id = auth.uid()
$$ language sql security definer stable;

-- profiles
create policy "own profile" on public.profiles
  for all using (id = auth.uid());

create policy "admin sees all profiles" on public.profiles
  for select using (public.get_my_role() = 'admin');

-- wineries
create policy "owner manages winery" on public.wineries
  for all using (owner_id = auth.uid());

create policy "public sees approved wineries" on public.wineries
  for select using (status = 'approved');

create policy "admin manages all wineries" on public.wineries
  for all using (public.get_my_role() = 'admin');

-- experiences
create policy "owner manages experiences" on public.experiences
  for all using (
    winery_id in (select id from public.wineries where owner_id = auth.uid())
  );

create policy "public sees active experiences" on public.experiences
  for select using (
    status = 'active'
    and winery_id in (select id from public.wineries where status = 'approved')
  );

create policy "admin manages all experiences" on public.experiences
  for all using (public.get_my_role() = 'admin');

-- bookings
create policy "traveler sees own bookings" on public.bookings
  for select using (traveler_id = auth.uid());

create policy "traveler creates bookings" on public.bookings
  for insert with check (traveler_id = auth.uid());

create policy "owner sees bookings for their experiences" on public.bookings
  for select using (
    experience_id in (
      select e.id from public.experiences e
      join public.wineries w on e.winery_id = w.id
      where w.owner_id = auth.uid()
    )
  );

create policy "owner updates booking status" on public.bookings
  for update using (
    experience_id in (
      select e.id from public.experiences e
      join public.wineries w on e.winery_id = w.id
      where w.owner_id = auth.uid()
    )
  );

create policy "admin manages all bookings" on public.bookings
  for all using (public.get_my_role() = 'admin');

-- inquiries
create policy "public inserts inquiry" on public.inquiries
  for insert with check (true);

create policy "owner sees their inquiries" on public.inquiries
  for select using (
    winery_id in (select id from public.wineries where owner_id = auth.uid())
  );

create policy "admin manages all inquiries" on public.inquiries
  for all using (public.get_my_role() = 'admin');

-- ─── TRIGGER: auto-create profile on signup ───────────────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'traveler');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
