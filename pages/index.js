import { Provider } from 'react-redux';
import { store } from '../store/store';
// import { GlobalStyles } from '../styles/globalStyles';



import LeadForm from '../components/LeadForm';

export default function Home() {
    return (
        <Provider store={store}>
            {/* <GlobalStyles /> */}
            <LeadForm />
        </Provider>
    );
}
