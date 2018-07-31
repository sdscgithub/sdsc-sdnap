CREATE TABLE ldap_domains (
Domain_id INTEGER PRIMARY KEY AUTOINCREMENT, 
Domain TEXT, 
User_id TEXT
) /$wgDBTableOptions*/;
CREATE INDEX user_id on ldap_domains (user_id);
