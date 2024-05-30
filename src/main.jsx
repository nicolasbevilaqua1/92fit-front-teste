import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import HomeView from './Home'
import SignupView from './Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './ErrorPage'
import LoginView from './Login'
import 'react-toastify/dist/ReactToastify.css';
import MainFit from './MainFit'
import ExerciseView from './ExerciseScreen'
import { Provider } from 'react-redux'
import store from './storage/store'
import RankingView from './RankingScreen'
import UserPerformanceView from './UserPerformance'
import RoutineView from './CustomRoutineScreen'
import CustomRankingView from './CustomRanking'
import CustomRankingMainView from './CustomRankingMain'
import CustomRoutineView from './CustomRoutineScreen'
import NossaHistoriaView from './NossaHistoria'
import SobreView from './Sobre'
import RecoverPasswordView from './RecoverPasswordScreen'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/historia",
    element: <NossaHistoriaView/>,
  },
  {
    path: "/sobre",
    element: <SobreView/>,
  },
  {
    path: "/signup",
    element: <SignupView/>,
  },
  {
    path: "/login",
    element: <LoginView/>,
  },
  {
    path: "/login/recover",
    element: <RecoverPasswordView></RecoverPasswordView>,
  },
  {
    path: "/main",
    element: <MainFit/>,
  },
  {
    path: "/ranking",
    element: <RankingView/>,
  },
  {
    path: "/ranking/:id",
    element: <RankingView custom={true} />,
  },
  {
    path: "/ranking/custom",
    element: <CustomRankingMainView/>,
  },
  {
    path: "/ranking/custom/create",
    element: <CustomRankingView/>,
  },
  {
    path: "/main/exercise/:exerciseId",
    element: <ExerciseView/>,
  },
  {
    path: "/main/exercise/custom/:routineId/:exerciseId",
    element: <ExerciseView custom={true}/>,
  },
  {
    path: "/main/routine",
    element: <CustomRoutineView/>,
  },
  {
    path: "/main/profile/analisis",
    element: <UserPerformanceView/>,
  },
], {
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
