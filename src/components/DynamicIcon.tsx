'use client'

import React from 'react'
import * as MuiIcons from '@mui/icons-material'
import { SvgIconProps } from '@mui/material/SvgIcon'

interface DynamicIconProps extends SvgIconProps {
  iconName: string
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, ...props }) => {
  const IconComponent = MuiIcons[iconName as keyof typeof MuiIcons] as React.ElementType<SvgIconProps>

  if (!IconComponent) {
    // Fallback to a default icon if the specified iconName is not found
    return <MuiIcons.HelpOutline {...props} />
  }

  return <IconComponent {...props} />
}

export default DynamicIcon
