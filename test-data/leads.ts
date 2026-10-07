export interface Lead {
  name: string;
  email: string;
  company: string;
  status: string;
}

// Seed data
export const totalSeededLeads = 12;

export const seededLead: Lead = {
  name: 'Sita Sharma',
  email: 'sita@himalkart.com.np',
  company: 'HimalKart',
  status: 'New',
};

export const nonExistentSearch = 'zzzzxq';

// Values the edit tests change Sita Sharma to (they restore her afterwards).
export const editedStatus = 'Contacted';
export const editedEmail = 'sita.sharma@himalkart.com.np';

// A suffix that is different on every run, so a lead left over from an earlier
// run can never be matched by mistake and the "exactly one row" checks stay valid.
function unique(lead: Lead): Lead {
  const suffix = `${Date.now()}`.slice(-6);
  return { ...lead, name: `${lead.name} ${suffix}` };
}

export const statusLead: Lead = unique({
  name: 'Hari Poudel',
  email: 'hari@gmail.com',
  company: 'Qniverse',
  status: 'Qualified',
});

export const listLead: Lead = unique({
  name: 'Sita Poudel',
  email: 'sita@gmail.com',
  company: 'Qniverse',
  status: 'New',
});

export const deletableLead: Lead = unique({
  name: 'Anita Poudel',
  email: 'anita@gmail.com',
  company: 'Qniverse',
  status: 'New',
});
