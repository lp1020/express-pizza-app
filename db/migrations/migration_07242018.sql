\connect pizza_dresselhaus_dev

CREATE TABLE IF NOT EXISTS pizza (
  id BIGSERIAL PRIMARY KEY,
  flavor VARCHAR(255),
  description VARCHAR(1024),
  location VARCHAR(255)
);
