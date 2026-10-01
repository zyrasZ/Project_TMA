import { companiesMock } from '../mocks/companies.mock';
import type { Company } from '../types/company';

// Giả lập Database nội bộ để lưu thay đổi tạm thời
let db = [...companiesMock];

export interface GetCompaniesParams {
  search?: string;
  status?: string | null;
  first?: number;
  rows?: number;
}

export interface GetCompaniesResponse {
  data: Company[];
  total: number;
}

export const companyApi = {
  // Lấy danh sách
  getCompanies: async (params?: GetCompaniesParams): Promise<GetCompaniesResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...db];
        
        if (params?.search) {
          const s = params.search.toLowerCase();
          filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(s) || 
            c.username.toLowerCase().includes(s) || 
            c.email.toLowerCase().includes(s)
          );
        }
        
        if (params?.status && params.status !== 'all') {
          filtered = filtered.filter(c => c.status === params.status);
        }
        
        const total = filtered.length;
        
        if (params?.first !== undefined && params?.rows !== undefined) {
          filtered = filtered.slice(params.first, params.first + params.rows);
        }
        
        resolve({ data: filtered, total });
      }, 500);
    });
  },
  
  // Lấy 1 công ty
  getCompanyById: async (id: string): Promise<Company | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.find(c => c.id === id));
      }, 500);
    });
  },

  // Thêm mới
  addCompany: async (newCompany: Company): Promise<Company> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        db = [newCompany, ...db];
        resolve(newCompany);
      }, 500);
    });
  },

  // Cập nhật
  updateCompany: async (updatedCompany: Company): Promise<Company> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        db = db.map(c => c.id === updatedCompany.id ? updatedCompany : c);
        resolve(updatedCompany);
      }, 500);
    });
  },

  // Đặt lại mật khẩu
  resetPassword: async (companyId: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const company = db.find(c => c.id === companyId);
        // Giả lập lưu mật khẩu mới vào db (ví dụ thêm trường password vào db)
        // Nhưng ở đây ta chỉ trả về số điện thoại làm mật khẩu mới
        resolve(company ? company.phone : '');
      }, 500);
    });
  }
};
