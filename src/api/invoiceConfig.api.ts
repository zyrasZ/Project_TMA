import { invoiceConfigsMock } from '../mocks/invoiceConfigs.mock';
import type {
  InvoiceConfig,
  CreateInvoiceConfigInput,
  UpdateInvoiceConfigInput,
  GetInvoiceConfigsParams,
  GetInvoiceConfigsResponse
} from '../types/invoiceConfig';

let db = [...invoiceConfigsMock];

export const invoiceConfigApi = {
  getInvoiceConfigs: async (params?: GetInvoiceConfigsParams): Promise<GetInvoiceConfigsResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...db];

        if (params?.search) {
          const s = params.search.toLowerCase().trim();
          filtered = filtered.filter(item =>
            item.id.toLowerCase().includes(s) ||
            item.configName.toLowerCase().includes(s) ||
            item.provider.toLowerCase().includes(s) ||
            item.serial.toLowerCase().includes(s) ||
            item.pattern.toLowerCase().includes(s)
          );
        }

        if (params?.provider && params.provider !== 'all') {
          filtered = filtered.filter(item => item.provider === params.provider);
        }

        const total = filtered.length;

        if (params?.first !== undefined && params?.rows !== undefined) {
          filtered = filtered.slice(params.first, params.first + params.rows);
        }

        resolve({ data: filtered, total });
      }, 300);
    });
  },

  getInvoiceConfigById: async (id: string): Promise<InvoiceConfig | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = db.find(c => c.id === id);
        resolve(item ? { ...item } : null);
      }, 200);
    });
  },

  createInvoiceConfig: async (input: CreateInvoiceConfigInput): Promise<InvoiceConfig> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const nextNum = (db.length + 1).toString().padStart(4, '0');
        const newConfig: InvoiceConfig = {
          id: nextNum,
          pattern: input.pattern || '1',
          serial: input.serial || 'C24MQQ',
          hasDigitalSignature: input.hasDigitalSignature ?? false,
          ...input,
          createdAt: new Date().toISOString()
        };
        db.unshift(newConfig);
        resolve(newConfig);
      }, 300);
    });
  },

  updateInvoiceConfig: async (input: UpdateInvoiceConfigInput): Promise<InvoiceConfig> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = db.findIndex(c => c.id === input.id);
        if (index !== -1) {
          db[index] = {
            ...db[index],
            ...input,
            updatedAt: new Date().toISOString()
          };
          resolve(db[index]);
        } else {
          reject(new Error('Invoice config not found'));
        }
      }, 300);
    });
  },

  deleteInvoiceConfig: async (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = db.findIndex(c => c.id === id);
        if (index !== -1) {
          db = db.filter(c => c.id !== id);
          resolve(true);
        } else {
          reject(new Error('Invoice config not found'));
        }
      }, 300);
    });
  }
};
