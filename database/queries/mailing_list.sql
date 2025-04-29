-- name: GetSubscribedEmail :one
select * from public.mailing_list
    where email = $1
    limit 1;

-- name: AddEmailToMailingList :one
insert into public.mailing_list (email)
    values ($1)
    returning *;

-- name: RemoveEmailFromMailingList :one
delete from public.mailing_list
    where id = $1
    returning *;

-- name: GetAllEmailsFromMailingList :many
select * from public.mailing_list;