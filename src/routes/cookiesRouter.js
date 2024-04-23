import { Router } from "express";

const router= Router();

router.get("/setCookies", (req,res)=>{
    res.cookie(
        "Esta es una Cookie Full Power!",
        {maxAge:10000}
    ).send("Se guardo la cookie correctamente!");
});

router.get ("/getCookies", (req,res)=>{
    console.log(req.cookies);
    res.send({
        cookies: req.cookies
    });
});

router.get("/deleteCookie", (req,res)=>{
    res.clearCookie ("Cookie").send("Se elimino correctamente la cookie");
});

// Signed

router.get("/signed/setCookies", (req,res)=>{
    res.cookie(
        "Esta es una Cookie Full Power!",
        {maxAge:10000, signed: true}
    ).send("Se guardo la cookie correctamente!");
});

router.get ("/signed/getCookies", (req,res)=>{
    console.log(req.signedCookies);
    res.send({
        cookies: req.signedCookies
    });
});
export default router