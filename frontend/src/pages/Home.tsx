import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import ServiceStatus from '../components/ServiceStatus'

export default function Home() {
  return (
    <div className="grid">
      <div>
        <RegisterForm />
      </div>
      <div>
        <LoginForm />
        <ServiceStatus />
      </div>
    </div>
  )
}

