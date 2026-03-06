"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format, isValid, parse } from "date-fns"

interface DatePickerInputProps {
    value?: string // ISO string
    onChange?: (value: string) => void
    label?: string
    id?: string
    placeholder?: string
}

export function DatePickerInput({
    value,
    onChange,
    label,
    id = "date-picker",
    placeholder = "Select date",
}: DatePickerInputProps) {
    const [open, setOpen] = React.useState(false)

    // Internal date state derived from value prop
    const date = React.useMemo(() => (value ? new Date(value) : undefined), [value])
    const [month, setMonth] = React.useState<Date | undefined>(date || new Date())

    // Internal input value state for manual typing
    const [inputValue, setInputValue] = React.useState(
        date && isValid(date) ? format(date, "MMMM dd, yyyy") : ""
    )

    // Update input value when external value changes
    React.useEffect(() => {
        if (date && isValid(date)) {
            setInputValue(format(date, "MMMM dd, yyyy"))
        } else if (!value) {
            setInputValue("")
        }
    }, [date, value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setInputValue(val)

        // Attempt to parse the date as the user types
        const parsedDate = parse(val, "MMMM dd, yyyy", new Date())
        if (isValid(parsedDate)) {
            onChange?.(parsedDate.toISOString())
            setMonth(parsedDate)
        }
    }

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            onChange?.(selectedDate.toISOString())
            setInputValue(format(selectedDate, "MMMM dd, yyyy"))
            setOpen(false)
        }
    }

    return (
        <InputGroup>
            <InputGroupInput
                id={id}
                value={inputValue}
                placeholder={placeholder}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setOpen(true)
                    }
                }}
            />
            <InputGroupAddon align="inline-end">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <InputGroupButton
                            id={`${id}-trigger`}
                            aria-label="Select date"
                            type="button"
                        >
                            <CalendarIcon className="h-4 w-4" />
                            <span className="sr-only">Select date</span>
                        </InputGroupButton>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={handleDateSelect}
                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                        />
                    </PopoverContent>
                </Popover>
            </InputGroupAddon>
        </InputGroup>
    )
}
