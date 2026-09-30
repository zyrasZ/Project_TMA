import { companiesMock } from '../mocks/companies.mock';
import type { Company } from '../types/company';

// Giả lập Database nội bộ để lưu thay đổi tạm thời
let db = [...companiesMock];

export const companyApi = {
  // Lấy danh sách
  getCompanies: async (): Promise<Company[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(db), 500));
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
