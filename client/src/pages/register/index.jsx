import styles from "./register.module.css";
import axios from "axios";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../lib/AuthProvider";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setUser } = useAuth();

    const handleCreateAccount = async (event) => {
        event.preventDefault();

        console.log(username);
        console.log(password);

        try {
            const data = {
                username: username,
                password: password,
            };

            const response = await axios.post(
                "http://localhost:3000/auth/register",
                data
            );

            const user = response.data;

            if (!user) {
                return;
            }

            setUser(user);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className={styles["page-wrapper"]}>
            <div className={styles["sign-up-wrapper"]}>
                <div className={styles["sign-up-container"]}>
                    <div>
                        <h2 className={styles["h2"]}>
                            Sign up for your account
                        </h2>

                        <p className={styles["link-text"]}>
                            Already a member?{" "}
                            <Link className={styles["link-a-tag"]} to="/login">
                                Login to your account
                            </Link>
                        </p>
                    </div>

                    <div className={styles["form-wrapper"]}>
                        <div>
                            <form
                                className={styles["form"]}
                                onSubmit={(event) => handleCreateAccount(event)}
                            >
                                <div>
                                    <label htmlFor="username">Username</label>

                                    <div className={styles["input-wrapper"]}>
                                        <input
                                            id="username"
                                            type="text"
                                            name="username"
                                            autoComplete="username"
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
                                            className={styles["input"]}
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        className={styles["button"]}
                                        type="submit"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={styles["home-link"]}>
                    <Link className={styles["link-a-tag"]} to="/">
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className={styles["img-wrapper"]}>
                <img
                    src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=1908&q=80"
                    alt="Caesar Salad"
                    className={styles["img"]}
                />
            </div>
        </main>
    );
}

export default Register;
