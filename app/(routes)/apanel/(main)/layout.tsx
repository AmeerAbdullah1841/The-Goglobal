import Sidebar from "@/components/apanel/sidebar/sidebar"

export default function APanelLayout({children}: {children: React.ReactNode}){
    return (
        <div className="flex w-full h-screen">
            <Sidebar/>
            <main className="flex-1 bg-gray-100">
                {children}
            </main>
        </div>
    )
}