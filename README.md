# The Wild Oasis

Internal application for manage a small hotel bookings, cabins, and to check in guests as they arrive.

Login:

Username: test@test.com  
Password: asdf1234

Features:

- Users of the app are hotel employees. They can log into the application and perform tasks
- New users can only be signed up inside the applications (to guarantee that only actual hotel employees can get accounts)
- Users able to upload an avatar, and change their name and password
- App has a table view with all cabins, showing the cabin photo, name, capacity, price, and current discount
- Users able to update or delete a cabin, and create new cabins (including uploading a photo)
- App has a table view with all bookings, showing arrival and departure dates, status, and paid amount, as well as cabin and guest data
- The booking status can be “unconfirmed” (booked but not yet checked in), “checked in”, or “checked out”. The table is filterable by this important status
- Other booking data includes: number of guests, number of nights, guest observations, whether they booked breakfast, breakfast price
- Users able to delete, check in, or check out a booking as the guest arrives.
- Bookings may not have been paid yet on guest arrival. Therefore, on check in, users able to accept payment (outside the app), and then confirm that payment has been received (inside the app)
- On check in, the guest have the ability to add breakfast for the entire stay, if they hadn’t already
- Guest data contain: full name, email, national ID, nationality, and a country flag for easy identification
- The initial app screen is a dashboard, to display important information for the last 7, 30, or 90 days:
- A list of guests checking in and out on the current day. Users able to perform these tasks from the dashboard
- Statistics on recent bookings, sales, check ins, and occupancy rate
- A chart showing all daily hotel sales, showing both “total” sales and “extras” sales (only breakfast at the moment)
- A chart showing statistics on stay durations.
- Users able to define a few application-wide settings: breakfast price, min and max nights/booking, max guests/booking
- App has a dark mode

Technology:

- Styled components
- React Query
- React Router
- Context API
- React Hook Form
- Recharts
- Supabase (Database, Authentication, Authorization)
