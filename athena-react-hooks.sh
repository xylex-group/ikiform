#!/bin/bash
# Optional React hooks from @xylex-group/athena

echo "React hooks are optional - no extra npm install needed beyond the main package."
echo ""
echo "Basic usage in a Next.js Client Component:"
echo ""
echo '"use client";'
echo ""
echo 'import {'
echo '  useQuery,'
echo '  useMutation,'
echo '  AthenaQueryClientProvider,'
echo '  createAthenaQueryClient,'
echo '} from "@xylex-group/athena/react";'
echo ""
echo 'const queryClient = createAthenaQueryClient({'
echo '  cache: { mode: "none" }'
echo '});'
echo ""
echo '// Wrap your app or component tree with the provider'
echo 'function MyApp() {'
echo '  return ('
echo '    <AthenaQueryClientProvider client={queryClient}>'
echo '      <YourComponents />'
echo '    </AthenaQueryClientProvider>'
echo '  );'
echo '}'
echo ""
echo '// Inside components:'
echo 'const { data, isLoading } = useQuery({'
echo '  queryKey: ["my-data"],'
echo '  queryFn: () => athena.from("table").select("*")'
echo '});'
echo ''
echo 'const mutation = useMutation({'
echo '  mutationFn: (newData) => athena.from("table").insert(newData)'
echo '});'
