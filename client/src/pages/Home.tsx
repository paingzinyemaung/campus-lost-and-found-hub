import { useState } from 'react';
import { Link } from 'react-router-dom';

// (၁) အသုံးပြုသူ အချက်အလက် (Dummy Data)
const currentUser = {
  name: 'Paing Zin Ye Maung',
  studentId: 'CST-2024-102',
  email: 'paingzin@example.com',
};

// ပစ္စည်းစာရင်း Data Type
interface Item {
  id: number;
  title: string;
  category: string;
  type: 'lost' | 'found';
  date: string;
  status: 'Active' | 'Resolved';
}

// (၃) ကိုယ်တိုင်တင်ထားသော ပစ္စည်းများ (Dummy Data)
const initialItems: Item[] = [
  {
    id: 1,
    title: 'MacBook Pro M1 Adapter',
    category: 'Electronics',
    type: 'lost',
    date: '2026-08-01',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Library Book (React Design Patterns)',
    category: 'Books',
    type: 'found',
    date: '2026-07-30',
    status: 'Resolved',
  },
  {
    id: 3,
    title: 'Black Wallet',
    category: 'Accessories',
    type: 'lost',
    date: '2026-07-28',
    status: 'Active',
  },
];

export default function Home() {
  const [items, setItems] = useState<Item[]>(initialItems);

  // (၂) Statistics တွက်ချက်မှုများ
  const totalPosted = items.length;
  const lostCount = items.filter((item) => item.type === 'lost').length;
  const foundCount = items.filter((item) => item.type === 'found').length;
  const resolvedCount = items.filter(
    (item) => item.status === 'Resolved',
  ).length;

  // ပစ္စည်းဖျက်ရန် Function
  const handleDelete = (id: number) => {
    if (window.confirm('ဒီပစ္စည်းစာရင်းကို ဖျက်ရန် သေချာပါသလား?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // Status အပြောင်းအလဲလုပ်ရန် Function
  const handleToggleStatus = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === 'Active' ? 'Resolved' : 'Active',
          };
        }
        return item;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- အပိုင်း (၁) User Profile & Overview Summary --- */}
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-16">
                <span className="text-xl font-bold">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                ကြိုဆိုပါတယ်၊ {currentUser.name}! 👋
              </h1>
              <div className="flex flex-wrap gap-2 md:gap-4 mt-2 text-sm text-base-content/70">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {currentUser.studentId}
                </span>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {currentUser.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <Link to="/items" className="btn btn-outline flex-1 md:flex-none">
              ပစ္စည်းများ ရှာဖွေရန်
            </Link>
            <Link
              to="/add-item"
              className="btn btn-primary flex-1 md:flex-none"
            >
              + ပစ္စည်းအသစ် တင်မည်
            </Link>
          </div>
        </div>

        {/* --- အပိုင်း (၂) Statistics Cards --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-300">
            <div className="stat-title font-medium">စုစုပေါင်းတင်ထားမှု</div>
            <div className="stat-value text-base-content mt-2">
              {totalPosted}
            </div>
          </div>

          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-error/20">
            <div className="stat-title font-medium">ပျောက်ဆုံး (Lost)</div>
            <div className="stat-value text-error mt-2">{lostCount}</div>
          </div>

          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-success/20">
            <div className="stat-title font-medium">တွေ့ရှိ (Found)</div>
            <div className="stat-value text-success mt-2">{foundCount}</div>
          </div>

          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-info/20">
            <div className="stat-title font-medium">ပြီးမြောက် (Resolved)</div>
            <div className="stat-value text-info mt-2">{resolvedCount}</div>
          </div>
        </div>

        {/* --- အပိုင်း (၃) My Posted Items Section --- */}
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-300 flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              📦 ကိုယ်တိုင်တင်ထားသော ပစ္စည်းများ
            </h2>
            <div className="badge badge-primary">{items.length}</div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold mb-2">
                ပစ္စည်းစာရင်း မရှိသေးပါ
              </h3>
              <p className="text-base-content/60 mb-6">
                သင်တင်ထားသော ပျောက်ဆုံး/တွေ့ရှိ ပစ္စည်းများ ဤနေရာတွင်
                ပေါ်လာပါမည်။
              </p>
              <Link to="/add-item" className="btn btn-primary">
                ပစ္စည်း စတင်တင်မည်
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                {/* Table Head */}
                <thead className="bg-base-200/50">
                  <tr>
                    <th>စဉ်</th>
                    <th>အမည်</th>
                    <th>အမျိုးအစား</th>
                    <th>အခြေအနေ</th>
                    <th>ရက်စွဲ</th>
                    <th className="text-right">လုပ်ဆောင်ချက်များ</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover">
                      <th className="font-normal text-base-content/60">
                        {index + 1}
                      </th>
                      <td className="font-semibold text-base-content">
                        {item.title}
                      </td>
                      <td>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm">{item.category}</span>
                          <span
                            className={`badge badge-sm font-medium uppercase ${item.type === 'lost' ? 'badge-error badge-outline' : 'badge-success badge-outline'}`}
                          >
                            {item.type}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          className={`badge ${item.status === 'Resolved' ? 'badge-info' : 'badge-ghost'} font-medium`}
                        >
                          {item.status}
                        </div>
                      </td>
                      <td className="text-sm text-base-content/70">
                        {item.date}
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(item.id)}
                            className={`btn btn-sm ${item.status === 'Active' ? 'btn-outline btn-info' : 'btn-ghost'}`}
                          >
                            {item.status === 'Active'
                              ? 'Resolved ပြောင်းမည်'
                              : 'Active ပြောင်းမည်'}
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-sm btn-square btn-outline btn-error"
                            title="ဖျက်ရန်"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
