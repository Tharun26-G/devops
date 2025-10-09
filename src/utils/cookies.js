export const cookies = {
    getOptions: () => ({
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ✅ fixed env variable
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    }),
  
    set: (res, name, value, options = {}) => {
      res.cookie(name, value, { ...cookies.getOptions(), ...options }); // ✅ use value & options
    },
  
    clear: (res, name, options = {}) => {
      res.clearCookie(name, { ...cookies.getOptions(), ...options });
    },
  };
  