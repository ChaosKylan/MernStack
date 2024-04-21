import styles from "./appbar.module.css";

import axios from "axios";

import { Link } from "react-router-dom";

import { useAuth } from "../../lib/AuthProvider";

function Appbar() {
    const { setUser } = useAuth();

    const handleLogout = async () => {
        console.log("Ausloggen");

        try {
            await axios.post("http://localhost:3000/auth/logout", null, {
                withCredentials: true,
            });

            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header>
            <nav className={styles["navbar"]}>
                <div className={styles["links-container"]}>
                    <button
                        className={styles["logout-btn"]}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                <div className={styles["links-container"]}>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/dashboard/account">Account</Link>
                    <Link
                        className={styles["add-list-btn"]}
                        to="/dashboard/new"
                    >
                        Add List
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Appbar;
