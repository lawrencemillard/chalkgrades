**The app requires some environment variables to be specified in order to function.** These should not be exposed in version control, logs, or anywhere else and need to be manually created at the locations listed below:

## in ../api/.env:

- `SUPABASE_URL` = (confidential - don't share) database connection URL you can get from your Supabase dashboard
- `SUPABASE_KEY` = (confidential - don't share) service role key to connect to the database - you can get from your Supabase dashboard
- `ABLY_KEY` = (confidential - don't share) root key you can get from your Ably dashboard
- `PASSWORD_PEPPER_USER` = (confidential - don't share) Will be appended before all user passwords before they're hashed - type in something completely random
- `PASSWORD_PEPPER_WORK` = (confidential - don't share) Will be appended before all work passwords before they're hashed - type in something completely random
- `USER_CODE` = (confidential - share only with staff) Access code required to create a new user account.
- `WORK_CODE` = (confidential - share only with staff) Access code required to create a new workspace.
- `ALLOWED_ORIGIN` = A URL (like `http://localhost:5173` for default Vite configs) used for CORS (cross origin resource sharing)
- `FLASK_APP` = `index.py` most of the time.

## in ../client/.env

- `VITE_REQUEST_LOCATION` = A URL (like `http://localhost:3000` for default Flask configs) used to send the requests to.
