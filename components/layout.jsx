import Header from 'components/Header'
import Footer from 'components/Footer'
import { AuthFlagProvider } from './providers/AuthFlagProvider';

export default function Layout({ children }) {
    return (
        <AuthFlagProvider>
            <Header />
            <main>{ children }</main>
            <Footer />
        </AuthFlagProvider>
    )
}
