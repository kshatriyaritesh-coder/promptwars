import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { OverviewDashboard } from './components/OverviewDashboard';
import { AqiForecastView } from './components/AqiForecastView';
import { FamilyProfileView } from './components/FamilyProfileView';
import { IndoorToolkitView } from './components/IndoorToolkitView';
import { LowEmissionTrackerView } from './components/LowEmissionTrackerView';
import { RoutePlannerView } from './components/RoutePlannerView';
import { WeeklyReportView } from './components/WeeklyReportView';
import { FloatingAssistantPill } from './components/FloatingAssistantPill';
import { AskBreatheWellDrawer } from './components/AskBreatheWellDrawer';
import { CustomizeModal } from './components/CustomizeModal';
import { FullPlanModal } from './components/FullPlanModal';
import { MemberDetailModal } from './components/MemberDetailModal';
import { AddMemberModal } from './components/AddMemberModal';

export const AppContent: React.FC = () => {
  const { activeTab, seniorMode, language } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [fullPlanOpen, setFullPlanOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
      case 'plan':
        return (
          <OverviewDashboard
            onOpenCustomize={() => setCustomizeOpen(true)}
            onOpenFullPlan={() => setFullPlanOpen(true)}
            onSelectMember={(id) => setSelectedMemberId(id)}
            onOpenAddMember={() => setAddMemberOpen(true)}
            onOpenAiChat={() => setAiDrawerOpen(true)}
          />
        );
      case 'air_quality':
      case 'forecast':
        return <AqiForecastView />;
      case 'my_family':
      case 'family':
        return <FamilyProfileView />;
      case 'indoor_toolkit':
      case 'indoor':
        return <IndoorToolkitView />;
      case 'low_emission_log':
      case 'tracker':
        return <LowEmissionTrackerView />;
      case 'routes':
        return <RoutePlannerView />;
      case 'weekly':
        return <WeeklyReportView />;
      default:
        return (
          <OverviewDashboard
            onOpenCustomize={() => setCustomizeOpen(true)}
            onOpenFullPlan={() => setFullPlanOpen(true)}
            onSelectMember={(id) => setSelectedMemberId(id)}
            onOpenAddMember={() => setAddMemberOpen(true)}
            onOpenAiChat={() => setAiDrawerOpen(true)}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen bg-[#f6f8f6] text-[#132622] flex ${
      seniorMode ? 'font-sans text-base leading-relaxed' : 'font-sans text-sm'
    }`}>
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        setMobileOpen={setMobileMenuOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 md:lg:pl-72 transition-all">
        <TopHeader
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenCustomize={() => setCustomizeOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {renderActiveView()}
        </main>
      </div>

      <FloatingAssistantPill onClick={() => setAiDrawerOpen(true)} />

      <AskBreatheWellDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
      />

      <CustomizeModal
        isOpen={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
      />

      <FullPlanModal
        isOpen={fullPlanOpen}
        onClose={() => setFullPlanOpen(false)}
      />

      <MemberDetailModal
        memberId={selectedMemberId}
        onClose={() => setSelectedMemberId(null)}
      />

      <AddMemberModal
        isOpen={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
      />
    </div>
  );
};
