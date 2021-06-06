import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  number,
  isCurrent = false,
  onPageChange,

}: PaginationItemProps) {
  if(isCurrent){
    return(
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        mr="4"
        colorScheme="green"
        disabled
        _disabled={{
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    )
  }

  return(
    <Button
      variant="outline"
      size="sm"
      fontSize="xs"
      width="4"
      mr="4"
      colorScheme="green"
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}