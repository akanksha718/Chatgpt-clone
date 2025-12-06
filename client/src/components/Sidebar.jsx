import React from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import moment from 'moment';
const Sidebar = () => {
    const { chats, setSelectedChat, theme, setTheme, navigate, user } = useAppContext();
    const [search, setSearch] = React.useState("");
    return (
        <div className='flex flex-col h-screen min-w-72 p-2 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 
        border-r border-[#80609F]/30 backdrop-blur-3xl
        transition-all duration-500 max-md:absolute left-0 z-1'>
            {/* Logo */}
            <img src={theme === "dark" ? assets.logo_full : assets.logo_full_dark} alt="Logo" className="w-full max-w-48" />
            {/* New Chat Button */}
            <button
                className="flex  items-center w-full py-2 mt-2 text-white
                bg-gradient-to-r from-[#7B61FF] to-[#FF61C6] rounded-lg hover:opacity-90 cursor-pointer"
                onClick={() => setSelectedChat(null)}
            >
                <span className='ml-2 mr-2 text-xl'>+</span> New Chat
            </button>
            <div className='flex items-center gap-2 p-3 mt-3 border border-gray-400
            dark:border-white/20 rounded-md'>
                <img src={assets.search_icon} alt="Search" className='w-4  not-dark:invert' />
                <input
                    type="text"
                    placeholder='Search chats...'
                    className='bg-transparent outline-none'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {chats.length > 0 && <p className='mt-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold px-1'>Your chats</p>}
            <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-1'>
                {
                    chats.filter((chat) => chat.messages[0] ? chat.messages[0]?.content.
                        toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().
                            includes(search.toLowerCase())).map((chat) => (
                                <button
                                    key={chat._id}
                                    onClick={() => setSelectedChat(chat)}
                                    className='w-full px-3 py-2 rounded-md text-left hover:bg-gray-200 dark:hover:bg-gray-700/40
                                    transition-colors group flex items-center justify-between text-gray-800 dark:text-white text-sm'>
                                    <span className='truncate'>
                                        {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 30) + (chat.messages[0].content.length > 30 ? '...' : '') : chat.name}
                                    </span>
                                    <img src={assets.bin_icon} className='hidden group-hover:block w-3.5 cursor-pointer
                                    not-dark:invert flex-shrink-0 ml-2'/>
                                </button>
                            ))
                }
            </div>
            <div>
                <button onClick={() => navigate('/community')} className='flex items-center p-1 gap-2  mt-4 w-full rounded-md cursor-pointer 
                 hover:bg-gray-200 dark:hover:bg-gray-700/40 transition-colors'>
                    <img src={assets.gallery_icon} className='w-4 not-dark:invert' alt="" />
                    <div className='flex flex-col text-sm text-left'>
                        <p className='text-gray-800 dark:text-white'>Community Images</p>
                    </div>
                </button>
                <button onClick={() => navigate('/credits')} className='flex items-center p-1 gap-2  mt-2 w-full rounded-md cursor-pointer 
            hover:bg-gray-200 dark:hover:bg-gray-700/40 transition-colors'>
                    <img src={assets.diamond_icon} className='w-4 dark:invert' alt="" />
                    <div className='flex flex-col text-sm text-left'>
                        <p className='text-gray-800 dark:text-white'>Credits :{user?.credits}</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>Purchase Credits</p>
                    </div>
                </button>
                <button className='flex items-center justify-between gap-2 p-1 mt-2 w-full rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/40 transition-colors'>
                    <div className='flex items-center gap-2 text-sm'>
                        <img src={assets.theme_icon} alt="Dark Mode" className='w-4 not-dark:invert' />
                        <p className='text-gray-800 dark:text-white'>Dark Mode</p>
                    </div>
                    <label className='relative inline-flex cursor-pointer'>
                        <input type="checkbox" className="sr-only peer"
                            checked={theme === "dark"}
                            onChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
                        <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'>

                        </div>
                        <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
                    </label>
                </button>
                <div  className='flex items-center justify-between gap-2 p-1 mt-2 w-full rounded-md hover:bg-gray-200 dark:hover:bg-gray-700/40 transition-colors group'>
                    <img src={assets.user_icon} className='w-7 rounded-full' alt="" />
                    <p className='flex-1 text-sm dark:text-primary truncate'>{user?user.name:'Login to your account'}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
