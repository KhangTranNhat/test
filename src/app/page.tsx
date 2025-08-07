// app/page.tsx (nếu bạn dùng App Router)

import { Table } from 'antd';

interface Student {
  id: string;
  fullName: string;
  studentId: string;
  class: string;
  gender: string;
  age: number;
}

// 👇 Gọi API ở server tại build time
async function getStudents(): Promise<Student[]> {
  const res = await fetch('https://67d977cd00348dd3e2ab3624.mockapi.io/api/v1/STU');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function Home() {
  const dataSource = await getStudents();

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'MSSV',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table rowKey="id" dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} />
    </div>
  );
}
