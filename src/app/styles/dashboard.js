export const dashboardStyles = {
  // Layout styles
  container: "flex min-h-screen bg-[#FBFBFB] text-[#222831]",
  sidebar: "w-64 bg-white shadow-lg",
  mainContent: "flex-1 p-6",
  
  // Header styles
  header: {
    nav: "relative px-6 py-4",
    gradient: "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#B771E5] to-[#76abae]",
    container: "max-w-7xl mx-auto flex justify-between items-center",
    title: "text-2xl font-semibold text-[#222831]",
    breadcrumb: "flex items-center text-sm text-[#393e46]",
    status: {
      container: "flex items-center gap-2 bg-[#D1F8EF] px-3 py-1.5 rounded-full",
      dot: "w-2 h-2 bg-emerald-500 rounded-full",
      text: "text-sm text-[#222831]"
    }
  },

  // API Keys section styles
  apiKeys: {
    container: "bg-[#FFF7F3] rounded-2xl p-6",
    header: {
      container: "flex justify-between items-center mb-6",
      title: "text-xl font-semibold text-[#222831]",
      addButton: "ml-4 flex items-center justify-center w-8 h-8 rounded-lg bg-[#eeeeee] hover:bg-[#f1eedc] hover:text-[#222831] transition-colors"
    },
    description: "text-[#222831] mb-8",
    table: {
      container: "overflow-x-auto",
      table: "w-full",
      header: "border-b border-[#393e46]",
      headerCell: "text-left py-4 px-4 text-[#222831] font-medium",
      row: "border-b border-[#393e46]/30",
      cell: "py-4 px-4 text-[#222831]",
      typeTag: "px-3 py-1 bg-[#eeeeee] rounded-full text-xs text-[#222831]",
      keyCode: "font-mono text-sm text-[#222831]",
      actions: "flex gap-3"
    }
  },

  // Modal styles
  modal: {
    overlay: "fixed inset-0 bg-[#1a1f36]/50 flex items-center justify-center p-4",
    container: "bg-[#e8f9ff] rounded-2xl p-10 max-w-2xl w-full",
    title: "text-[32px] font-bold text-[#1a1f36] mb-3",
    description: "text-[#3c4257] text-lg",
    inputGroup: {
      container: "mb-8",
      label: "text-lg font-semibold text-[#1a1f36]",
      description: "text-[#3c4257]",
      input: "w-full px-4 py-3 text-lg border-2 border-[#e6e8eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#1a1f36] placeholder-[#697386]"
    },
    buttons: {
      container: "flex justify-end gap-4",
      cancel: "px-6 py-2.5 text-white hover:text-[#94a3b8] transition-colors text-base font-medium",
      submit: "px-6 py-2.5 bg-[#0052ff] text-white rounded-xl hover:bg-[#0040cc] transition-colors text-base font-medium"
    }
  }
}; 