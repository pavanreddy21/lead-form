import { Provider } from 'react-redux';

import Settings from '../../components/settings';
import AuthGuard from '../../components/AuthGuard';
import { store } from '../../store/store';

export default function Admin() {
    return (
        <Provider store={store}>
            <AuthGuard>
                <Settings />
            </AuthGuard>
        </Provider>
    );
}
