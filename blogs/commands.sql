CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0,
);

insert into blogs (author, url, title) values ('Dan Abramow', 'http://url.com', 'Writing Resilient Components');
insert into blogs (author, url, title) values ('Martin Fowler', 'http://url.com', 'Is High Quality Software Worth the Cost?');