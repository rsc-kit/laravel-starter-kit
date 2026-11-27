// As upstream's routes/settings.php: a verified email, and the password asked
// for again before two-factor and passkeys are shown.
export const middleware = ["verified", "password.confirm"];
