'use client';

import { cn } from '../../../lib/utils';
import { X, CheckCircle, Warning, Info } from '@phosphor-icons/react';
import { ToastActionProps, ToastContentProps, ToastCloseProps, ToastMessageProps, ToastDescriptionProps, ToastIconProps, ToastRootProps, ToastTitleProps, Toast as PRToast } from 'primereact/toast';
import { ToasterPortalProps, ToasterRegionInstance, ToasterRegionProps, ToasterRootProps, ToastType, Toaster as PRToaster, toast } from 'primereact/toaster';

function ToasterRoot({ ...props }: ToasterRootProps) {
    return <PRToaster.Root {...props} />;
}

function ToasterPortal({ ...props }: ToasterPortalProps) {
    return <PRToaster.Portal {...props} />;
}

function ToasterRegion({ className, ...props }: ToasterRegionProps) {
    return (
        <PRToaster.Region
            className={cn(
                `fixed w-auto z-[9999] pointer-events-none
                data-[position=bottom-right]:right-4 data-[position=bottom-right]:bottom-4
                data-[position=bottom-center]:bottom-4 data-[position=bottom-center]:left-1/2 data-[position=bottom-center]:-translate-x-1/2
                data-[position=bottom-left]:left-4 data-[position=bottom-left]:bottom-4
                data-[position=top-right]:right-4 data-[position=top-right]:top-4
                data-[position=top-center]:top-4 data-[position=top-center]:left-1/2 data-[position=top-center]:-translate-x-1/2
                data-[position=top-left]:left-4 data-[position=top-left]:top-4`,
                className
            )}
            {...props}
        />
    );
}

function ToastRoot({ className, ...props }: ToastRootProps) {
    return (
        <PRToast.Root
            className={cn(
                // layout & appearance (merged with DarkToastTemplate)
                `w-[360px] max-w-[90vw] p-4 rounded-lg outline-none absolute touch-none pointer-events-auto
                bg-grey-neutral-800 shadow-xl`,

                // position based on parent region
                `in-data-[position=bottom-right]:[--px-raise-factor:-1] in-data-[position=bottom-right]:bottom-0 in-data-[position=bottom-right]:right-0
                in-data-[position=bottom-center]:[--px-raise-factor:-1] in-data-[position=bottom-center]:bottom-0
                in-data-[position=bottom-left]:[--px-raise-factor:-1] in-data-[position=bottom-left]:bottom-0 in-data-[position=bottom-left]:left-0
                in-data-[position=top-right]:[--px-raise-factor:1] in-data-[position=top-right]:top-0 in-data-[position=top-right]:right-0
                in-data-[position=top-center]:[--px-raise-factor:1] in-data-[position=top-center]:top-0
                in-data-[position=top-left]:[--px-raise-factor:1] in-data-[position=top-left]:top-0 in-data-[position=top-left]:left-0`,

                // css custom properties
                `[--px-offset-y:calc(var(--px-swipe-amount-y)+(var(--px-toast-offset)+var(--px-toast-index)*var(--px-gap))*var(--px-raise-factor))]
                [--px-offset-x:var(--px-swipe-amount-x)]`,

                // base animation state
                `opacity-0
                z-(--px-toast-z-index)
                transform-[translateX(var(--px-offset-x))_translateY(calc(100%*var(--px-raise-factor)*-1))]
                [transition:transform_0.3s,opacity_0.3s,height_0.3s]`,

                // mounted
                `data-mounted:opacity-100
                data-mounted:transform-[translateY(0)]`,

                // collapsed stack (not expanded, not front)
                `not-data-expanded:not-data-front:overflow-hidden
                not-data-expanded:not-data-front:h-(--px-front-toast-height)
                not-data-expanded:not-data-front:transform-[translateX(var(--px-offset-x))_translateY(calc(var(--px-raise-factor)*var(--px-toast-index)*var(--px-gap)))_scale(calc(var(--px-toast-index)*-0.05+1))]`,

                // expanded
                `data-mounted:data-expanded:h-(--px-initial-height)
                data-mounted:data-expanded:transform-[translateX(var(--px-offset-x))_translateY(var(--px-offset-y))]`,

                // expanded gap area
                `data-expanded:after:content-[''] data-expanded:after:absolute data-expanded:after:left-0 data-expanded:after:w-full data-expanded:after:bottom-full data-expanded:after:h-[calc(var(--px-gap)+1px)]`,

                // not visible (! to ensure it overrides data-mounted)
                `not-data-visible:opacity-0! not-data-visible:pointer-events-none! not-data-visible:select-none!`,

                // removed: front toast exit
                `data-removed:data-front:not-data-swipe-out:opacity-0
                data-removed:data-front:not-data-swipe-out:transform-[translateX(var(--px-offset-x))_translateY(calc(var(--px-raise-factor)*-100%))]`,

                // removed: non-front expanded exit
                `data-removed:not-data-front:not-data-swipe-out:data-expanded:opacity-0
                data-removed:not-data-front:not-data-swipe-out:data-expanded:transform-[translateX(var(--px-offset-x))_translateY(calc(var(--px-raise-factor)*var(--px-offset-y)*0.4))]`,

                // removed: non-front collapsed exit
                `data-removed:not-data-front:not-data-swipe-out:not-data-expanded:opacity-0
                data-removed:not-data-front:not-data-swipe-out:not-data-expanded:transform-[translateX(var(--px-offset-x))_translateY(calc(var(--px-raise-factor)*40%*-1))]
                data-removed:not-data-front:not-data-swipe-out:not-data-expanded:[transition:transform_500ms,opacity_200ms]`,

                // swiping
                `data-swiping:[transition:none]!
                data-swiping:transform-[translateX(var(--px-offset-x))_translateY(var(--px-offset-y))]!`,

                // swiped
                `data-swiped:select-none`,

                // swipe-out directions
                `data-swipe-out:data-[swipe-direction=up]:opacity-0
                data-swipe-out:data-[swipe-direction=up]:transform-[translateX(var(--px-offset-x))_translateY(calc(var(--px-offset-y)-100%))]!`,

                `data-swipe-out:data-[swipe-direction=down]:opacity-0
                data-swipe-out:data-[swipe-direction=down]:transform-[translateX(var(--px-offset-x))_translateY(calc(var(--px-offset-y)+100%))]!`,

                `data-swipe-out:data-[swipe-direction=left]:opacity-0
                data-swipe-out:data-[swipe-direction=left]:transform-[translateX(calc(var(--px-offset-x)-100%))_translateY(var(--px-offset-y))]!`,

                `data-swipe-out:data-[swipe-direction=right]:opacity-0
                data-swipe-out:data-[swipe-direction=right]:transform-[translateX(calc(var(--px-offset-x)+100%))_translateY(var(--px-offset-y))]!
                data-swipe-out:data-[swipe-direction=right]:[transition:transform_500ms,opacity_200ms]`,

                className
            )}
            {...props}
        />
    );
}

function ToastContent({ className, ...props }: ToastContentProps) {
    return <PRToast.Content className={cn('flex items-start gap-4', className)} {...props} />;
}

function ToastMessage({ className, ...props }: ToastMessageProps) {
    return <PRToast.Message className={cn('flex-1 pr-6 min-w-0', className)} {...props} />;
}

function ToastTitle({ className, ...props }: ToastTitleProps) {
    return <PRToast.Title className={cn('text-white font-medium text-sm mb-1', className)} {...props} />;
}

function ToastDescription({ className, ...props }: ToastDescriptionProps) {
    return <PRToast.Description className={cn('text-grey-neutral-100 text-sm', className)} {...props} />;
}

function ToastIcon({ className, ...props }: ToastIconProps) {
    return <PRToast.Icon className={cn('shrink-0 [&>svg]:size-6', className)} {...props} />;
}

function ToastClose({ className, ...props }: ToastCloseProps) {
    return <PRToast.Close className={cn('absolute top-4 right-4 text-grey-neutral-200 hover:text-white transition-colors cursor-pointer', className)} {...props} />;
}

function ToastAction({ className, ...props }: ToastActionProps) {
    return <PRToast.Action className={cn('', className)} {...props} />;
}

function Toaster({ ...props }: ToasterRootProps) {
    return (
        <ToasterRoot {...props}>
            <ToasterPortal>
                <ToasterRegion>
                    {({ toaster }: ToasterRegionInstance) =>
                        toaster?.toasts.map((t: ToastType) => (
                            <ToastRoot key={t.id} toast={t}>
                                <ToastContent>
                                    <ToastIcon match="success" className="text-success">
                                        <CheckCircle weight="fill" />
                                    </ToastIcon>
                                    <ToastIcon match="error" className="text-alert">
                                        <Warning weight="fill" />
                                    </ToastIcon>
                                    <ToastIcon match="warn" className="text-warning">
                                        <Warning weight="fill" />
                                    </ToastIcon>
                                    <ToastIcon match="info" className="text-info">
                                        <Info weight="fill" />
                                    </ToastIcon>
                                    <ToastMessage>
                                        <ToastTitle />
                                        <ToastDescription />
                                    </ToastMessage>
                                </ToastContent>
                                <ToastClose as="button">
                                    <X size={16} />
                                </ToastClose>
                            </ToastRoot>
                        ))
                    }
                </ToasterRegion>
            </ToasterPortal>
        </ToasterRoot>
    );
}

export { toast, Toaster, ToasterPortal, ToasterRegion, ToasterRoot, ToastAction, ToastContent, ToastClose, ToastMessage, ToastDescription, ToastIcon, ToastRoot, ToastTitle };
