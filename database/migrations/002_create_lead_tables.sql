create table if not exists public.contact_us_leads (
  id bigint generated always as identity primary key,
  name text not null,
  mobile_number text not null,
  email text not null,
  pincode text not null,
  subject text not null,
  message text not null,
  source text not null default 'Website',
  verified boolean not null default true,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_id text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  created_at timestamptz not null default current_timestamp
);

create table if not exists public.hyundai_promise_leads (
  id bigint generated always as identity primary key,
  type text not null check (type in ('Buy', 'Sell')),
  full_name text not null,
  mobile_number text not null,
  email text not null,
  location text not null,
  car_brand text,
  car_model text not null,
  year_of_purchase integer check (year_of_purchase is null or year_of_purchase between 1886 and 9999),
  kilometers_driven integer check (kilometers_driven is null or kilometers_driven >= 0),
  budget_range numeric,
  additional_details text,
  source text not null default 'Website',
  verified boolean not null default true,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_id text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  created_at timestamptz not null default current_timestamp
);

create table if not exists public.numbers_only (
  id bigint generated always as identity primary key,
  phone_number text not null,
  form_source text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_id text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  created_at timestamptz not null default current_timestamp
);

create table if not exists public.service_leads (
  id bigint generated always as identity primary key,
  car_model text not null,
  service_centre text not null,
  service_type text not null,
  name text not null,
  mobile_number text not null,
  email text not null,
  registration_number text,
  preferred_date date not null,
  preferred_time text not null,
  pickup_drop text not null check (pickup_drop in ('Yes', 'No')),
  source text not null default 'Website',
  verified boolean not null default true,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_id text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  created_at timestamptz not null default current_timestamp
);

create table if not exists public.test_drive_leads (
  id bigint generated always as identity primary key,
  car_model text not null,
  location text not null,
  name text not null,
  mobile_number text not null,
  email text not null,
  pincode text not null,
  address text,
  preferred_date date not null,
  preferred_time text not null,
  source text not null default 'Website',
  verified boolean not null default true,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_id text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  created_at timestamptz not null default current_timestamp
);

create index if not exists contact_us_leads_created_at_idx
  on public.contact_us_leads (created_at desc);
create index if not exists contact_us_leads_mobile_number_idx
  on public.contact_us_leads (mobile_number);

create index if not exists hyundai_promise_leads_created_at_idx
  on public.hyundai_promise_leads (created_at desc);
create index if not exists hyundai_promise_leads_mobile_number_idx
  on public.hyundai_promise_leads (mobile_number);

create index if not exists numbers_only_created_at_idx
  on public.numbers_only (created_at desc);
create index if not exists numbers_only_phone_number_idx
  on public.numbers_only (phone_number);

create index if not exists service_leads_created_at_idx
  on public.service_leads (created_at desc);
create index if not exists service_leads_mobile_number_idx
  on public.service_leads (mobile_number);

create index if not exists test_drive_leads_created_at_idx
  on public.test_drive_leads (created_at desc);
create index if not exists test_drive_leads_mobile_number_idx
  on public.test_drive_leads (mobile_number);
