import { saveLeadsData } from '@/components/uitls';
import { createSlice } from '@reduxjs/toolkit';

export const leadsSlice = createSlice({
    name: 'leads',
    initialState: [],
    reducers: {
        addLead: (state, action) => {
            state.push({ ...action.payload });
        },
        setLeadsData: (state, action) => {
            return action.payload;
        },
        setLeadStatus: (state, action) => {
            const { index, status } = action.payload;
            const lead = state.find((lead, cur) => cur === index);
            if (lead) {
                lead.status = status;
            }
            saveLeadsData(state);
        }
    },
});

export const { addLead, setLeadsData, setLeadStatus } = leadsSlice.actions;
export default leadsSlice.reducer;
