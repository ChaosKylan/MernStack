import styles from "./login.module.css";
import axios from "axios";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../lib/AuthProvider";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();

        console.log(username);
        console.log(password);

        try {
            const data = {
                username: username,
                password: password,
            };

            const response = await axios.post(
                "http://localhost:3000/auth/login",
                data,
                {
                    withCredentials: true,
                }
            );

            const user = response.data;

            if (!user) {
                return;
            }

            setUser(user);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            const data = error.response.data;
            setMessage(data.message);
        }
    };

    return (
        <main className={styles["page-wrapper"]}>
            <h1 className={styles["heading"]}>Sign in to your account!</h1>

            <div className={styles["card-wrapper"]}>
                <div className={styles["card"]}>
                    <form
                        className={styles["form"]}
                        onSubmit={(event) => handleLogin(event)}
                    >
                        <div>
                            <label htmlFor="username">Username</label>

                            <div className={styles["input-wrapper"]}>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="Enter your username"
                                    className={styles["input"]}
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>

                            <div className={styles["input-wrapper"]}>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className={styles["input"]}
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <button className={styles["button"]} type="submit">
                            Sign In
                        </button>

                        {message && (
                            <p className={styles["error"]}>{message}</p>
                        )}
                    </form>
                </div>

                <div className={styles["links-wrapper"]}>
                    <p className={styles["links-text"]}>
                        Not a member?{" "}
                        <Link className={styles["links-a-tag"]} to="/register">
                            Register
                        </Link>
                    </p>

                    <p className={styles["links-text"]}>
                        Going back?{" "}
                        <Link className={styles["links-a-tag"]} to="/">
                            Homepage
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;
