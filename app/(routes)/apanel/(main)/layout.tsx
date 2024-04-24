import Sidebar from "@/components/apanel/sidebar/sidebar"

export default function APanelLayout({children}: {children: React.ReactNode}){
    return (
        <div className="flex">
            <Sidebar/>
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}