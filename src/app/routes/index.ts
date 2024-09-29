import { Router } from "express";
import { AuthRoutes } from "../modules/auth/authRoutes";
import { UserRoutes } from "../modules/user/userRoutes";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { PostRoutes } from "../modules/post/post.route";
import { CommentRoutes } from "../modules/comment/comment.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/post',
        route: PostRoutes,
    },
    {
        path: '/comment',
        route: CommentRoutes,
    },
    {
        path: '/payment',
        route: PaymentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;