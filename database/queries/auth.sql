-- name: CreateDBSession :exec
insert into public.user_sessions (id, user_id, expires_at)
values ($1, $2, $3);

-- name: GetUserSessionBySessionID :one
select * from public.user_sessions where id = $1;

-- name: DeleteUserSessionBySessionID :exec
delete from public.user_sessions where id = $1;

-- name: DeleteAllUserSessionsByUserID :exec
delete from public.user_sessions where user_id = $1;

-- name: UpdateUserSessionExpiresAt :exec
update public.user_sessions set expires_at = $2 where id = $1;

-- name: CreateEmailUser :one
insert into public.app_users (first_name, last_name, email, password, account_type)
values ($1, $2, $3, $4, 'email')
returning *;

-- name: CreateGithubUser :one
insert into public.app_users (first_name, last_name, oauth_id, account_type, email_verified)
values ($1, $2, $3, 'github', true)
returning *;

-- name: CreateGoogleUser :one
insert into public.app_users (first_name, last_name, oauth_id, account_type, email_verified)
values ($1, $2, $3, 'google', true)
returning *;

-- name: UpdateDBUserPassword :exec
update public.app_users set password = $2 where id = $1;

-- name: GetUserByEmail :one
select * from public.app_users where email ILIKE $1 and account_type = 'email';

-- name: GetUserByGithubID :one
select * from public.app_users where oauth_id = $1 and account_type = 'github';

-- name: GetUserByGoogleID :one
select * from public.app_users where oauth_id = $1 and account_type = 'google';

-- name: GetUserByID :one
select * from public.app_users where id = $1;

-- name: CreateEmailVerificationToken :one
insert into public.email_verification_tokens (user_id, token, expires_at)
values ($1, $2, $3)
returning *;

-- name: DeleteAllEmailVerificationTokensByUserID :exec
delete from public.email_verification_tokens where user_id = $1;

-- name: GetEmailVerificationTokenByToken :one
select * from public.email_verification_tokens where token = $1;

-- name: GetEmailByVerificationTokenID :one
select email from public.app_users where id = (select user_id from public.email_verification_tokens where public.email_verification_tokens.id = $1);

-- name: VerifyUserEmail :exec
update public.app_users set email_verified = true where id = $1;

-- name: ChangePassword :exec
update public.app_users set password = $2 where id = $1;

-- name: CreatePasswordResetToken :one
insert into public.password_reset_tokens (user_id, token, expires_at)
values ($1, $2, $3)
returning *;

-- name: GetEmailByPasswordResetTokenID :one
select email from public.app_users where id = (select user_id from public.password_reset_tokens where public.password_reset_tokens.id = $1);

-- name: GetPasswordResetTokenByToken :one
select * from public.password_reset_tokens where token = $1;

-- name: DeleteAllPasswordResetTokensByUserID :exec
delete from public.password_reset_tokens where user_id = $1;