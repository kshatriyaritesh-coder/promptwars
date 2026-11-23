import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useApp } from '../context/AppContext';
import { PERSONA_PRESETS } from '../data/personas';
import { translations } from '../i18n/translations';
import { fetchCityAirQuality } from '../services/aqiService';
import { generateDailySmogPlan } from '../services/riskEngine';
import { TopHeader } from './TopHeader';

vi.mock('../context/AppContext', () => ({
  useApp: vi.fn()
}));

const mockedUseApp = vi.mocked(useApp);
type AppContextValue = ReturnType<typeof useApp>;
const household = PERSONA_PRESETS[0].household;
const baseAqi = fetchCityAirQuality('Delhi NCR');

function makeContext(overrides: Partial<AppContextValue> = {}): AppContextValue {
  return {
    activeTab: 'overview',
    setActiveTab: vi.fn(),
    language: 'en',
    setLanguage: vi.fn(),
    t: translations.en,
    selectedPersonaId: 'priya',
    selectPersona: vi.fn(),
    household,
    updateHousehold: vi.fn(),
    addFamilyMember: vi.fn(),
    removeFamilyMember: vi.fn(),
    updateFamilyMember: vi.fn(),
    aqiData: baseAqi,
    setCity: vi.fn(),
    dailyPlan: generateDailySmogPlan(household.members, baseAqi, true),
    completedHacks: {},
    toggleHackCompleted: vi.fn(),
    emissionLogs: [],
    addEmissionLog: vi.fn(),
    badges: [],
    streakDays: 0,
    seniorMode: false,
    toggleSeniorMode: vi.fn(),
    isReadingAloud: false,
    speakText: vi.fn(),
    stopSpeaking: vi.fn(),
    alertNotification: null,
    dismissAlert: vi.fn(),
    ...overrides
  };
}

function renderHeader(context: AppContextValue = makeContext()) {
  mockedUseApp.mockReturnValue(context);
  render(<TopHeader onOpenMobileMenu={vi.fn()} onOpenCustomize={vi.fn()} />);
  return context;
}

describe('TopHeader', () => {
  beforeEach(() => {
    mockedUseApp.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('uses the AQI and current plan in its spoken air brief', () => {
    const aqiData = { ...baseAqi, aqi: 151, cpcbCategory: 'Moderate' as const };
    const dailyPlan = generateDailySmogPlan(household.members, aqiData, true);
    const context = renderHeader(makeContext({ aqiData, dailyPlan }));

    fireEvent.click(screen.getByRole('button', { name: 'Listen to air brief' }));

    expect(context.speakText).toHaveBeenCalledWith(
      expect.stringContaining(`AQI in ${household.city} is 151, Moderate`)
    );
    expect(context.speakText).toHaveBeenCalledWith(
      expect.stringContaining(dailyPlan.bestOutdoorWindow)
    );
  });

  it('does not present an outdoor window as safe when AQI is very poor', () => {
    const aqiData = { ...baseAqi, aqi: 342, cpcbCategory: 'Very Poor' as const };
    const context = renderHeader(makeContext({
      aqiData,
      dailyPlan: generateDailySmogPlan(household.members, aqiData, true)
    }));

    fireEvent.click(screen.getByRole('button', { name: 'Listen to air brief' }));

    expect(context.speakText).toHaveBeenCalledOnce();
    expect(context.speakText).toHaveBeenCalledWith(
      expect.stringContaining('avoid nonessential outdoor activity')
    );
    expect(context.speakText).not.toHaveBeenCalledWith(
      expect.stringContaining('Best outdoor window:')
    );
  });

  it('closes the language picker with Escape and returns focus to its trigger', () => {
    renderHeader();
    const trigger = screen.getByRole('button', { name: 'Change language' });

    fireEvent.click(trigger);
    expect(screen.getByRole('group', { name: 'Choose language' })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('group', { name: 'Choose language' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('dismisses the active air-quality alert', () => {
    const context = renderHeader(makeContext({
      alertNotification: 'AQI is above your alert threshold.'
    }));

    fireEvent.click(screen.getByRole('button', { name: 'Notifications, one new alert' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));

    expect(context.dismissAlert).toHaveBeenCalledOnce();
  });
});
