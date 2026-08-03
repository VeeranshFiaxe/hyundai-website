create table if not exists public.phone_otps (
  id bigint generated always as identity primary key,
  phone_number text not null unique,
  otp text not null check (otp ~ '^[0-9]{4}$'),
  attempts smallint not null default 0 check (attempts between 0 and 5),
  created_at timestamptz not null default current_timestamp,
  expires_at timestamptz not null,
  verified boolean not null default false,
  request_count smallint not null default 1 check (request_count between 1 and 3),
  request_date date not null default ((current_timestamp at time zone 'UTC')::date)
);

create index if not exists phone_otps_expires_at_idx
  on public.phone_otps (expires_at);
