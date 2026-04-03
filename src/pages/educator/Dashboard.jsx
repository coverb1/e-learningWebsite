import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/Appcontext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'

const Dashboard = () => {
  const { currency } = useContext(AppContext)
  const [dashBoardData, setDashBoardData] = useState(null)

  const fetchDashbordData = async () => {
    setDashBoardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDashbordData()
  }, [])

  return dashBoardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>

      <div className='space-y-6 w-full'>
        <div className='flex flex-wrap gap-6 items-stretch'>

          {/* Card 1 */}
          <div className='flex items-center gap-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-5 w-64 h-28 rounded-xl'>
            <img src={assets.patients_icon} alt="" className='w-10 h-10' />
            <div className='flex flex-col justify-center'>
              <p className='text-2xl font-semibold text-gray-700'>
                {dashBoardData.enrolledStudentsData.length}
              </p>
              <p className='text-sm text-gray-500'>Total Enrollment</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className='flex items-center gap-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-5 w-64 h-28 rounded-xl'>
            <img src={assets.patients_icon} alt="" className='w-10 h-10' />
            <div className='flex flex-col justify-center'>
              <p className='text-2xl font-semibold text-gray-700'>
                {dashBoardData.totalCourses}
              </p>
              <p className='text-sm text-gray-500'>Total Courses</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className='flex items-center gap-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-5 w-64 h-28 rounded-xl'>
            <img src={assets.earning_icon} alt="" className='w-10 h-10' />
            <div className='flex flex-col justify-center'>
              <p className='text-sm text-gray-500'>{currency}</p>
              <p className='text-2xl font-semibold text-gray-700'>
                {dashBoardData.totalEarnings}
              </p>
              <p className='text-sm text-gray-500'>Total Earnings</p>
            </div>
          </div>

        </div>

        {/* Table Section */}
        <div>
          <h2 className='pb-4 text-lg font-medium'>Latest Enrollment</h2>

          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-200'>

            <table className='w-full'>
              <thead className='text-gray-900 border-b border-gray-200 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold'>#</th>
                  <th className='px-4 py-3 font-semibold'>Student Name</th>
                  <th className='px-4 py-3 font-semibold'>Course Title</th>
                </tr>
              </thead>

              <tbody className='text-sm text-gray-500'>
                {dashBoardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className='border-b border-gray-100 hover:bg-gray-50'>

                    <td className='px-4 py-3'>
                      {index + 1}
                    </td>

                    <td className='px-4 py-3 flex items-center gap-3'>
                      <img
                        src={item.student.imageUrl}
                        alt=""
                        className='w-8 h-8 rounded-full'
                      />
                      <span>{item.student.name}</span>
                    </td>

                    <td className='px-4 py-3'>
                      {item.courseTitle}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>

    </div>
  ) : <Loading />
}

export default Dashboard