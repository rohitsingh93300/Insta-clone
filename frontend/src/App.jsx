import { useDispatch, useSelector } from "react-redux";
import ChatPage from "./components/ChatPage";
import EditProfile from "./components/EditProfile";
import Home from "./components/Home";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Profile from "./components/Profile";
import Signup from "./components/Signup"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";
import MobChat from "./components/MobChat";
import Explore from "./components/Explore";
import VideoCard from "./components/VideoCard";
// import SinglePost from "./components/SinglePost";
import ProtectedRoute from "./components/ProtectedRoute";
// import Chat from "./components/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>
      },
      {
        path: "/profile/:id",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: "/explore",
        element: <ProtectedRoute><Explore /></ProtectedRoute>
      },
      {
        path: "/reels",
        element: <VideoCard />
      },
      {
        path: "/account/edit",
        element: <ProtectedRoute><EditProfile /></ProtectedRoute>
      },
      {
        path: "/chat",
        element: <ProtectedRoute><ChatPage /></ProtectedRoute>
      },
      {
        path: "/mobchat/:id",
        element: <ProtectedRoute><MobChat /></ProtectedRoute>
      },
    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
]);

function App() {
  const { user } = useSelector(store => store.auth);
  const {socket} = useSelector(store=>store.socketio)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio))

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch])

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
