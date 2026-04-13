export const StatesDiagram = () => {
    return (
        <div className="not-prose rounded-[18px] border border-[#166E3F]/20 bg-[#D1FAE4] p-5 text-[#166E3F] transition-colors duration-200 hover:bg-[#C7F4DD] dark:border-[#6AE1A1]/20 dark:bg-[#0F4C2C] dark:text-[#6AE1A1] dark:hover:bg-[#125735]">
            <div className="mb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="text-sm font-medium text-[#166E3F] dark:text-[#6AE1A1]">
                        mobile-app
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#166E3F]/70 dark:text-[#6AE1A1]/80">
                        Product
                    </div>
                </div>
            </div>

            <div className="rounded-[16px] border border-[#133A9A]/20 bg-[#E3EAFD] p-5 text-[#133A9A] transition-colors duration-200 hover:bg-[#D8E3FC] dark:border-[#7196F4]/20 dark:bg-[#07296A] dark:text-[#7196F4] dark:hover:bg-[#0A347F]">
                <div className="mb-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="text-sm font-medium text-[#133A9A] dark:text-[#7196F4]">
                                Production
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <div className="inline-flex items-center rounded-[8px] border border-[#133A9A]/15 bg-[#F0F4FE] px-2 py-0.5 text-xs font-medium tracking-[-0.1px] text-[#133A9A] dark:border-[#7196F4]/15 dark:bg-[#03153A] dark:text-[#7196F4]">
                                    <Icon icon="git-branch" size={14} className="mr-1.5" />
                                    backend/main
                                </div>
                                <div className="inline-flex items-center rounded-[8px] border border-[#133A9A]/15 bg-[#F0F4FE] px-2 py-0.5 text-xs font-medium tracking-[-0.1px] text-[#133A9A] dark:border-[#7196F4]/15 dark:bg-[#03153A] dark:text-[#7196F4]">
                                    <Icon icon="git-branch" size={14} className="mr-1.5" />
                                    frontend/main
                                </div>
                            </div>
                        </div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#133A9A]/70 dark:text-[#7196F4]/80">
                            Implementation
                        </div>
                    </div>
                </div>

                <div className="rounded-[14px] border border-[#5314A3]/20 bg-[#ECDFFB] p-4 text-[#5314A3] transition-colors duration-200 hover:bg-[#E5D3FB] dark:border-[#B78AF0]/20 dark:bg-[#3A0F71] dark:text-[#B78AF0] dark:hover:bg-[#47138A]">
                    <div className="mb-3">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="text-sm font-medium text-[#5314A3] dark:text-[#B78AF0]">
                                    carbon-calculator
                                </div>
                                <div className="text-xs text-[#5314A3]/80 dark:text-[#B78AF0]/80">
                                    feature.yaml
                                </div>
                            </div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5314A3]/70 dark:text-[#B78AF0]/80">
                                Feature
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 rounded-[10px] border border-[#A16207]/20 bg-[#FEF9C3] px-3.5 py-2.5 text-[#A16207] transition-colors duration-150 hover:bg-[#FDF3AE] dark:border-[#FDE047]/20 dark:bg-[#713F12] dark:text-[#FDE047] dark:hover:bg-[#854D0E]">
                            <span className="min-w-14 shrink-0 text-xs font-medium">
                                CALC.1
                            </span>
                            <span className="flex-1 text-sm font-medium">
                                Shows emissions breakdown
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs">
                                <Icon icon="check" size={12} />
                                accepted
                            </span>
                        </div>
                        <div className="flex items-center gap-3 rounded-[10px] border border-[#A16207]/20 bg-[#FEF9C3] px-3.5 py-2.5 text-[#A16207] transition-colors duration-150 hover:bg-[#FDF3AE] dark:border-[#FDE047]/20 dark:bg-[#713F12] dark:text-[#FDE047] dark:hover:bg-[#854D0E]">
                            <span className="min-w-14 shrink-0 text-xs font-medium">
                                CALC.2
                            </span>
                            <span className="flex-1 text-sm font-medium">
                                Calculates flight footprint
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs">
                                <Icon icon="check" size={12} />
                                accepted
                            </span>
                        </div>
                        <div className="flex items-center gap-3 rounded-[10px] border border-[#A16207]/20 bg-[#FEF9C3] px-3.5 py-2.5 text-[#A16207] transition-colors duration-150 hover:bg-[#FDF3AE] dark:border-[#FDE047]/20 dark:bg-[#713F12] dark:text-[#FDE047] dark:hover:bg-[#854D0E]">
                            <span className="min-w-14 shrink-0 text-xs font-medium">
                                CALC.3
                            </span>
                            <span className="flex-1 text-sm font-medium">
                                Calculates hotel footprint
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs">
                                <Icon icon="circle" size={12} />
                                completed
                            </span>
                        </div>
                        <div className="flex items-center gap-3 rounded-[10px] border border-[#A16207]/20 bg-[#FEF9C3] px-3.5 py-2.5 text-[#A16207] transition-colors duration-150 hover:bg-[#FDF3AE] dark:border-[#FDE047]/20 dark:bg-[#713F12] dark:text-[#FDE047] dark:hover:bg-[#854D0E]">
                            <span className="min-w-14 shrink-0 text-xs font-medium">
                                CALC.4
                            </span>
                            <span className="flex-1 text-sm font-medium text-[#A16207] dark:text-[#FEF08A]">
                                Exports report to CSV
                            </span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs">
                                <Icon icon="clock-3" size={12} />
                                assigned
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
