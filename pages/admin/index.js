import { Provider } from 'react-redux';

import LeadList from '../../components/LeadList';
import AuthGuard from '../../components/AuthGuard';
import { store } from '../../store/store';

export default function Admin() {
    return (
        <Provider store={store}>
            <AuthGuard>
                <LeadList />
            </AuthGuard>
        </Provider>
    );
}
