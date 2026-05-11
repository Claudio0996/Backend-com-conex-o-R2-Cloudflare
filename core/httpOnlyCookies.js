exports.sendRefreshCookie = (res, refreshToken, expiration) =>{
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: expiration
    })
}