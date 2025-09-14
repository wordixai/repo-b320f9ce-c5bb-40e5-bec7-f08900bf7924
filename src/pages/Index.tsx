import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { RemotionRoot } from '../remotion/Root';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Download, Settings, Code, BarChart3, Terminal } from 'lucide-react';

const Index = () => {
  const [selectedComposition, setSelectedComposition] = useState('TechVideo');
  const [customProps, setCustomProps] = useState({
    title: 'Dynamic Tech Presentation',
    subtitle: 'Advanced Animation Sequences',
    brandColor: '#42b883',
    code: `function createVideoAnimation() {
  const timeline = gsap.timeline();
  return timeline.to('.element', {
    duration: 2,
    scale: 1.2,
    ease: 'elastic.out'
  });
}`
  });

  const compositions = [
    {
      id: 'TechVideo',
      name: 'Tech Video Presentation',
      description: 'Complete tech presentation with code reveals and animations',
      icon: <Play className="w-5 h-5" />,
      duration: '60s',
      fps: 30
    },
    {
      id: 'CodeReveal',
      name: 'Code Animation',
      description: 'Typewriter effect code reveal with syntax highlighting',
      icon: <Code className="w-5 h-5" />,
      duration: '30s',
      fps: 30
    },
    {
      id: 'DataVisualization',
      name: 'Data Dashboard',
      description: 'Animated charts and metrics visualization',
      icon: <BarChart3 className="w-5 h-5" />,
      duration: '40s',
      fps: 30
    },
    {
      id: 'TerminalSimulation',
      name: 'Terminal Demo',
      description: 'Realistic terminal command simulation',
      icon: <Terminal className="w-5 h-5" />,
      duration: '30s',
      fps: 30
    }
  ];

  const handleRender = () => {
    // This would trigger the Remotion render process
    console.log('Rendering video with composition:', selectedComposition);
    // In a real implementation, you'd call the Remotion render API
  };

  return (
    <div className="min-h-screen bg-background tech-grid">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold gradient-text mb-4">
            Remotion Video Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create dynamic videos with advanced animation sequences, code reveals, 
            and tech-focused content using React and Remotion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border glow-cyan">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Video Preview
                </CardTitle>
                <CardDescription>
                  Preview your video composition in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-background rounded-lg overflow-hidden">
                  <Player
                    component={RemotionRoot}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={30}
                    durationInFrames={1800}
                    controls
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    inputProps={customProps}
                  />
                </div>
                
                {/* Control Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <Button className="glow-green" onClick={handleRender}>
                    <Download className="w-4 h-4 mr-2" />
                    Render Video
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Composition Selector */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Compositions</CardTitle>
                <CardDescription>
                  Choose a video template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {compositions.map((comp) => (
                    <div
                      key={comp.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedComposition === comp.id
                          ? 'border-primary bg-primary/10 glow-green'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedComposition(comp.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {comp.icon}
                        <span className="font-medium">{comp.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {comp.description}
                      </p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{comp.duration}</span>
                        <span>{comp.fps} FPS</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customization Panel */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Customization</CardTitle>
                <CardDescription>
                  Modify video content and styling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={customProps.title}
                        onChange={(e) => setCustomProps(prev => ({
                          ...prev,
                          title: e.target.value
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={customProps.subtitle}
                        onChange={(e) => setCustomProps(prev => ({
                          ...prev,
                          subtitle: e.target.value
                        }))}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="style" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="brandColor">Brand Color</Label>
                      <Input
                        id="brandColor"
                        type="color"
                        value={customProps.brandColor}
                        onChange={(e) => setCustomProps(prev => ({
                          ...prev,
                          brandColor: e.target.value
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Animation Style</Label>
                      <Select defaultValue="smooth">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smooth">Smooth</SelectItem>
                          <SelectItem value="elastic">Elastic</SelectItem>
                          <SelectItem value="bouncy">Bouncy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">Code Snippet</Label>
                      <Textarea
                        id="code"
                        value={customProps.code}
                        onChange={(e) => setCustomProps(prev => ({
                          ...prev,
                          code: e.target.value
                        }))}
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">
            Video Creation Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Code Animations',
                description: 'Typewriter effects with syntax highlighting',
                icon: <Code className="w-8 h-8" />
              },
              {
                title: 'Logo Morphing',
                description: 'Smooth transitions and brand integration',
                icon: <Settings className="w-8 h-8" />
              },
              {
                title: 'Data Visualization',
                description: 'Animated charts and metrics',
                icon: <BarChart3 className="w-8 h-8" />
              },
              {
                title: 'Terminal Simulation',
                description: 'Realistic command-line demos',
                icon: <Terminal className="w-8 h-8" />
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-card/30 backdrop-blur-sm border-border hover:glow-cyan transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;