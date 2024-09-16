import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "./components/Date-range-picker"
import { TabMenu } from "./components/Menu"

export default function DashboardPage() {
  return (
    <>
      <div className="hidden flex-col md:flex w-full desktop:h-full notebook:h-screen notebook:font-md">
        <div className="flex flex-col space-y-4 p-8 pt-5">
          <div className="flex w-full items-center justify-between space-y-2">
            <h2 className="text-2xl desktop:text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2 pt-20">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <TabMenu />
        </div>
      </div>
    </>
  )
}
