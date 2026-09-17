exports.sendRefreshCookie = (res, refreshToken, expiration) =>{
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        expires: expiration,
        secure: true
    })
}