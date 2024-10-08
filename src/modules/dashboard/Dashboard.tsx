import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "./components/Date-range-picker"
import { TabMenu } from "./components/Menu"

export default function DashboardPage() {
  return (
    <>
      <div className="hidden flex-col md:flex w-full desktop:h-full notebook:h-screen notebook:font-md">
        <div className="flex flex-col space-y-4 p-8 pt-10">
          <div className="flex items-center pb-5 justify-between">
            <h2 className="desktop:text-[2rem] text-[1.5rem] font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-2 pt-2">
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
