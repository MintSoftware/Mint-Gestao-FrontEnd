import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function ConfigAparencia() {
    return (
        <div className="flex flex-col gap-6 items-center w-[100%] h-[100%]">
            <Card className="flex flex-col gap-6 w-[60%] h-[100%]">
                <div className="">
                    <h1 className="text-2xl font-semibold">Appearance</h1>
                    <p className="text-sm  mt-2 mb-4">
                        Customize the appearance of the app. Automatically switch between day and night themes.
                    </p>
                    <Separator />
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-2">Font</h2>
                        <Select>
                            <SelectTrigger id="font">
                                <SelectValue placeholder="Inter" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="inter">Inter</SelectItem>
                                <SelectItem value="roboto">Roboto</SelectItem>
                                <SelectItem value="openSans">Open Sans</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-gray-600 mt-2">Set the font you want to use in the dashboard.</p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-2">Theme</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="w-full">
                                <CardContent className="flex items-center justify-center p-4">
                                    <div className="bg-white p-4 rounded-lg shadow-inner w-full">
                                        <div className="h-4 bg-gray-200 rounded mb-2" />
                                        <div className="h-4 bg-gray-200 rounded mb-2" />
                                        <div className="h-4 bg-gray-200 rounded mb-2" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center">
                                    <Button variant="ghost">Light</Button>
                                </CardFooter>
                            </Card>
                            <Card className="w-full">
                                <CardContent className="flex items-center justify-center p-4">
                                    <div className="bg-gray-800 p-4 rounded-lg shadow-inner w-full">
                                        <div className="h-4 bg-gray-300 rounded mb-2" />
                                        <div className="h-4 bg-gray-300 rounded mb-2" />
                                        <div className="h-4 bg-gray-300 rounded mb-2" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center">
                                    <Button variant="ghost">Dark</Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Select the theme for the dashboard.</p>
                    </div>
                    <Button>Update preferences</Button>
                </div>
            </Card>
        </div>
    )
}