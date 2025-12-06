import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";
import React from 'react'

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [chats, setChats] = React.useState([]);
    const [selectedChat, setSelectedChat] = React.useState(null);
    const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "light");
    const fetchUser = async () => {
        setUser(dummyUserData);
    };
    const fetchUserchat = async () => {
        setChats(dummyChats);
        setSelectedChat(dummyChats[0]);
    };
    React.useEffect(() => {
        fetchUser();
    }, []);
    React.useEffect(() => {
        if (user) {
            fetchUserchat();
        }
        else {
            setChats([]);
            setSelectedChat(null);
            navigate("/login");
        }
    }, [user]);
    React.useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);
    const value = {
        navigate,
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme,
        fetchUser,
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};
export const useAppContext = () => React.useContext(AppContext);