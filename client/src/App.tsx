import { lazy, Suspense, useState, useEffect } from 'react';
import { unstable_HistoryRouter as Router, Routes, Route } from 'react-router-dom';
import { browserHistory } from './service/browserHistory';
import './App.css';
import Header from './pages/Header';
import Load from './components/load/Load';
import { useGlobalStore } from './service/useGlobalStore';
import {EmailVerificationModal} from './service/EmailVerificationModal'
import { LoadAuthUser } from './service/LoadAuthUser';




function App() {


  const user = useGlobalStore((state) => state.user);



  const CadastraPaciente = lazy(() => import('./pages/CadastraPaciente'))
  const ListaPacientes = lazy(() => import('./pages/ListaPacientes'))
  const PacientePage = lazy(() => import('./pages/Paciente'))
  const CadastraAvCompCorp = lazy(() => import('./pages/CadastraCompCorp'))
  const AvCompCorp = lazy(() => import('./pages/Compcorp'))
  const CadastraAvAntropometrica = lazy(() => import('./pages/CadastraAntropometrica'))
  const AvAntropometrica = lazy(() => import('./pages/Antropometrica'))
  const Login = lazy(() => import('./pages/auth/Login'))
  const Register = lazy(() => import('./pages/auth/Registro'))
  // const Laudo = lazy(() => import('./pages/Laudo'))
  const Usuario = lazy(() => import('./pages/Usuario'))
  const Chat = lazy(() => import('./pages/Chat'))
  const NotFound = lazy(() => import('./pages/NotFound'))
  // const PasswordChange = lazy(()=>import('./pages/PasswordChange'))

  return (
        <Router history={browserHistory}>
  
          <Suspense fallback={<Load />}>
  
            <Header />
            <LoadAuthUser />
            <EmailVerificationModal/>
            
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<CadastraPaciente />} />
              <Route path="/pacientes" element={<ListaPacientes />} />
              <Route path="/pacientes/:id" element={<PacientePage />} />
              <Route path="/cadastrocompcorp/:id" element={<CadastraAvCompCorp />} />
              <Route path="/compcorp/:id" element={<AvCompCorp />} />
              <Route path="/cadastroantropometrica/:id" element={<CadastraAvAntropometrica />} />
              <Route path="/antropometrica/:id" element={<AvAntropometrica />} />
              {/* <Route path="/laudo/:id" element={<Laudo />} /> */}
              <Route path="/usuario" element={<Usuario />} />
              <Route path="/chat" element={<Chat />} />
              {/* <Route path="/password-change" element={<PasswordChange />} />          */}
  
            </Routes>
          </Suspense>
        </Router>
  
      );


}

export default App;
