import { lazy, Suspense, useState, useEffect } from 'react';
import { unstable_HistoryRouter as Router, Routes, Route } from 'react-router-dom';
import { browserHistory } from './service/browserHistory';
import './App.css';
import Header from './pages/header';
import Load from './components/load/load';
import { useGlobalStore } from './service/useGlobalStore';
import {EmailVerificationModal} from './service/EmailVerificationModal'




function App() {


  const user = useGlobalStore((state) => state.user);



  const CadastraPaciente = lazy(() => import('./pages/cadastraPaciente'))
  const ListaPacientes = lazy(() => import('./pages/listaPacientes'))
  const PacientePage = lazy(() => import('./pages/Paciente'))
  const CadastraAvCompCorp = lazy(() => import('./pages/cadastraCompCorp'))
  const AvCompCorp = lazy(() => import('./pages/compcorp'))
  const CadastraAvAntropometrica = lazy(() => import('./pages/cadastraAntropometrica'))
  const AvAntropometrica = lazy(() => import('./pages/antropometrica'))
  const Login = lazy(() => import('./pages/auth/login'))
  const Register = lazy(() => import('./pages/auth/registro'))
  const Laudo = lazy(() => import('./pages/Laudo'))
  const Usuario = lazy(() => import('./pages/auth/usuario'))


  if (!user.isAuthenticated) {
    return (
      <Router history={browserHistory}>

        <Suspense fallback={<Load />}>
     
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
            <Route path="/registro" element={<Register />} />
          </Routes>
        </Suspense>
      </Router>);
  }
  else {
    return (
      <Router history={browserHistory}>

        <Suspense fallback={<Load />}>

          <Header />
          <EmailVerificationModal/>
          <Routes>
            <Route path="*" element={<Usuario />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<CadastraPaciente />} />
            <Route path="/cadastro" element={<CadastraPaciente />} />
            <Route path="/pacientes" element={<ListaPacientes />} />
            <Route path="/pacientes/:id" element={<PacientePage />} />
            <Route path="/cadastrocompcorp/:id" element={<CadastraAvCompCorp />} />
            <Route path="/compcorp/:id" element={<AvCompCorp />} />
            <Route path="/cadastroantropometrica/:id" element={<CadastraAvAntropometrica />} />
            <Route path="/antropometrica/:id" element={<AvAntropometrica />} />
            <Route path="/laudo/:id" element={<Laudo />} />
            <Route path="/usuario" element={<Usuario />} />

          </Routes>
        </Suspense>
      </Router>

    );
  }

}

export default App;
